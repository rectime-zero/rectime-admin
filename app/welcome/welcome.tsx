import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Welcome() {
  // UIの状態を管理するステート群
  const [userData, setUserData] = useState<{
    name: string | null;
    email: string | null;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Googleログインボタンが押されたときの処理
  const handleGoogleLogin = async () => {
    // 処理開始時に状態をリセット＆ロード中フラグを立てる
    setErrorMsg("");
    setIsLoading(true);

    try {
      // Firebaseのポップアップログインを実行
      const result = await signInWithPopup(auth, provider);

      // 成功したら取得したユーザー情報を画面表示用にセット
      setUserData({
        name: result.user.displayName,
        email: result.user.email,
      });
    } catch (error) {
      console.error("ログイン実行エラー:", error);
      setErrorMsg("認証がキャンセルされたか、エラーが発生しました。");
    } finally {
      // 成功・失敗に関わらずロード状態を解除
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src={logoDark}
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
        </header>

        <div className="max-w-[300px] w-full space-y-8 px-4">
          {/* ログイン前の表示：ボタン */}
          {!userData ? (
            <div>
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full bg-gray-800 text-white font-bold py-3 px-4 rounded"
              >
                {isLoading ? "通信中..." : "Googleでログイン"}
              </button>

              {/* エラーメッセージエリア */}
              {errorMsg && (
                <p className="text-red-600 text-sm font-medium text-center bg-red-50 p-2 rounded">
                  {errorMsg}
                </p>
              )}
            </div>
          ) : (
            /* ログイン後の表示：ユーザー情報 */
            <div className="border border-gray-200 bg-gray-50 dark:bg-gray-900/20 dark:border-gray-800 rounded-lg p-6 space-y-2">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-400">
                認証成功
              </p>
              <div className="text-gray-800 dark:text-gray-200">
                <p className="font-semibold text-lg">{userData.name} さん</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {userData.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
