import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  OAuthProvider,
  signInWithPopup,
  type Auth,
} from "firebase/auth";

import { env, isFirebaseConfigured } from "~/config/env";

export type AuthenticatedOAuthUser = {
  uid: string;
  email: string;
  idToken: string;
  displayName: string | null;
  photoUrl: string | null;
};

let authInstance: Auth | null = null;

export async function authenticateWithMicrosoft(): Promise<AuthenticatedOAuthUser> {
  if (!isFirebaseConfigured()) {
    throw new Error(
      "Firebase OAuth の設定が不足しています。VITE_FIREBASE_API_KEY と VITE_FIREBASE_APP_ID などを実値で設定してください。"
    );
  }

  const auth = getClientAuth();
  const provider = new OAuthProvider("microsoft.com");
  provider.setCustomParameters({
    prompt: "select_account",
  });

  if (env.firebaseTenantId.length > 0) {
    auth.tenantId = env.firebaseTenantId;
  }

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const email = user.email?.trim().toLowerCase();

    if (!email) {
      throw new Error("OAuth からメールアドレスを取得できませんでした。");
    }

    return {
      uid: user.uid,
      email,
      idToken: await user.getIdToken(),
      displayName: user.displayName,
      photoUrl: user.photoURL,
    };
  } catch (error) {
    throw normalizeFirebaseAuthError(error);
  }
}

function getClientAuth() {
  if (authInstance) {
    return authInstance;
  }

  const app =
    getApps()[0] ||
    initializeApp({
      apiKey: env.firebaseApiKey,
      authDomain: env.firebaseAuthDomain,
      projectId: env.firebaseProjectId,
      appId: env.firebaseAppId,
    });

  authInstance = getAuth(app);
  return authInstance;
}

function normalizeFirebaseAuthError(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    const errorMessage =
      "message" in error && typeof error.message === "string"
        ? error.message
        : "";

    switch (error.code) {
      case "auth/popup-closed-by-user":
        return new Error("OAuth ポップアップが閉じられました。");
      case "auth/popup-blocked":
        return new Error("OAuth ポップアップがブラウザにブロックされました。");
      case "auth/cancelled-popup-request":
        return new Error("OAuth 処理がキャンセルされました。");
      case "auth/account-exists-with-different-credential":
        return new Error("別の認証方法で登録済みのメールアドレスです。");
      case "auth/unauthorized-domain":
        return new Error(
          "Firebase Auth の許可ドメインに現在のホストがありません。localhost または 127.0.0.1 を Authorized domains に追加してください。"
        );
      case "auth/operation-not-allowed":
        return new Error(
          "Firebase Authentication で Microsoft プロバイダが有効化されていません。"
        );
      case "auth/invalid-api-key":
        return new Error("VITE_FIREBASE_API_KEY が不正です。");
      case "auth/app-not-authorized":
        return new Error(
          "Firebase アプリ設定が承認されていません。API キー、App ID、Authorized domains を確認してください。"
        );
      default:
        return new Error(
          `Microsoft OAuth に失敗しました。Firebase error: ${error.code}${
            errorMessage ? ` (${errorMessage})` : ""
          }`
        );
    }
  }

  return error instanceof Error
    ? error
    : new Error("Microsoft OAuth に失敗しました。");
}
