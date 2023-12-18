"use client";

import Image from "next/image";
import mainStyle from "../page.module.css";
import styles from "./page.module.css";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface State {
  screen: "input" | "loading" | "result";
  videoBlob: Blob | null;
}

function GeneratePage() {
  const router = useRouter();
  const [state, setState] = useState<State>({
    screen: "input",
    videoBlob: null,
  });
  const [text, setText] = useState("");

  async function fetchVideo() {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob(); // Blob으로 변환
      return blob;
    } catch (error) {
      router.push("/");
      console.error("Fetch error:", error);
    }
  }

  const handleOnButtonClick = () => {
    if (state.screen === "input") {
      if (text.trim().length === 0) {
        return;
      }

      setState({ ...state, screen: "loading" });
      fetchVideo().then((blob) => {
        if (!blob) {
          router.push("/");
          return;
        }
        setState({ ...state, screen: "result", videoBlob: blob });
      });
    }

    if (state.screen === "result") {
      router.push("/");
    }
  };

  return (
    <main className={mainStyle.main}>
      <Image
        src="/circles.svg"
        alt=".."
        className={mainStyle.circles}
        width={323}
        height={15}
        priority
      />
      <h1>치타는 달린다</h1>
      <h2>짤 생성기</h2>
      <Image
        src="/circles.svg"
        alt=".."
        className={mainStyle.circles}
        width={323}
        height={15}
        priority
      />

      {state.screen === "input" && <p>문구 입력</p>}
      {state.screen === "input" && (
        <input
          className={styles.textField}
          type="text"
          placeholder="여기에 문구 입력"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}

      {state.screen === "loading" && (
        <div className={styles.loading}>
          <div className={styles.loadingText1}>
            달리는 치타
            <br />
            만드는중...
          </div>
          <div className={styles.loadingText2}>얼마안걸림</div>
        </div>
      )}
      {state.screen === "result" && (
        <div className={styles.annotate}>치타는 달린다!!!</div>
      )}
      {state.screen === "result" ? (
        <video
          className={styles.videoplayer}
          src={state.videoBlob ? URL.createObjectURL(state.videoBlob) : ""}
          autoPlay
          loop
        />
      ) : (
        <></>
      )}

      {state.screen === "result" && (
        <a
          className={mainStyle.uglyButton}
          href={state.videoBlob ? URL.createObjectURL(state.videoBlob) : ""}
          download="치타는 달린다.mp4"
          style={{ marginTop: "2rem", marginBottom: "1rem" }}
        >
          MP4 다운로드
        </a>
      )}

      <div className={styles.row}>
        <div
          className={
            state.screen === "result"
              ? styles.uglyButtonSmall
              : styles.uglyButton
          }
          onClick={handleOnButtonClick}
        >
          {
            {
              input: "완료",
              loading: "잠시만요,",
              result: "다시 하기",
            }[state.screen]
          }
        </div>
        {state.screen === "result" && (
          <div
            className={styles.uglyButtonSmall}
            onClick={() => {
              if (!navigator.share) {
                alert("지원하지 않는 브라우저입니다.");
                return;
              }
              navigator.share({
                title: "치타는 달린다 짤 생성기",
                text: "치타는 웃고 있다는 말을 들어보셨나요? 🐆🐆\n아니, 이제는 치타도 달려야🏃‍♀️💨 할 때가 왔습니다.\n🔥🔥치타는 달린다 짤을 만들어보세요!🔥🔥",
                url: "https://cheetahisrunning.site",
              });
            }}
          >
            사이트 공유
          </div>
        )}
      </div>
    </main>
  );
}

export default GeneratePage;
