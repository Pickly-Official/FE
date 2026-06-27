const KAKAO_SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";

let kakaoSdkPromise = null;

function loadKakaoSdk() {
  if (window.Kakao) {
    return Promise.resolve(window.Kakao);
  }

  if (kakaoSdkPromise) {
    return kakaoSdkPromise;
  }

  kakaoSdkPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${KAKAO_SDK_URL}"]`);

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.Kakao), { once: true });
      existingScript.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.async = true;
    script.onload = () => resolve(window.Kakao);
    script.onerror = () => reject(new Error("카카오 공유 SDK를 불러오지 못했습니다."));
    document.head.appendChild(script);
  });

  return kakaoSdkPromise;
}

async function getKakao() {
  const kakaoKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  if (!kakaoKey) {
    throw new Error("카카오 JavaScript 키가 설정되지 않았습니다.");
  }

  const Kakao = await loadKakaoSdk();

  if (!Kakao) {
    throw new Error("카카오 공유 SDK를 사용할 수 없습니다.");
  }

  if (!Kakao.isInitialized()) {
    Kakao.init(kakaoKey);
  }

  return Kakao;
}

export async function shareKakaoVote({ title, description, url, imageUrl }) {
  const Kakao = await getKakao();
  const shareTitle = title || "Pickly 투표에 참여해보세요!";
  const shareDescription = description || "친구의 사진을 스와이프하고 베스트컷을 골라주세요.";
  const link = {
    mobileWebUrl: url,
    webUrl: url,
  };

  if (imageUrl) {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: shareTitle,
        description: shareDescription,
        imageUrl,
        link,
      },
      buttons: [
        {
          title: "투표하러 가기",
          link,
        },
      ],
    });
    return;
  }

  Kakao.Share.sendDefault({
    objectType: "text",
    text: `${shareTitle}\n${shareDescription}`,
    link,
    buttonTitle: "투표하러 가기",
  });
}
