const KEY = 'fake-db:hr-info';

function read() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
  catch { return {}; }
}
function write(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

// 최초 더미 데이터
if (!localStorage.getItem(KEY)) {
  write({
    offices: [
      { img_src: "/images/hr_img_01.png" },
      { img_src: "/images/hr_img_02.png" },
    ],
    interviews: [
      {
        id: 1,
        href: "https://www.youtube.com/embed/Aq86f_JsEfw?si=Anq1uhm3O_ahWzIZ",
        title: "KS오토플랜 신입사원을 위한 Q&A : 당신의 시작, 우리의 성장 - 영업팀편",
      },
      {
        id: 2,
        href: "https://www.youtube.com/embed/g1k2dDeRHD0?si=-fHLHepDw7od0M0F",
        title: "The New Beginning : 수입차 딜러에서 KS오토플랜으로 전향한 이유",
      },
    ],
    addresses: [
      {
        id: 1,
        img_src: "/images/hr_img_02.png",
        spot: "본사 1지점",
        address_txt: "인천시 연수구 갯벌로 12 미추홀 타워 (송도동 7-50) 15층 전체",
      },
      {
        id: 2,
        img_src: "/images/hr_img_03.png",
        spot: "2지점",
        address_txt: "인천시 연수구 인천타워대로 323 송도 센트로드 B동 (송도동 30-3) 31층 전체",
      },
      {
        id: 3,
        img_src: "/images/hr_img_02.png",
        spot: "3지점",
        address_txt: "인천시 연수구 인천타워대로 99 애니오션빌딩 (송도동 11-104) 14층 전체",
      },
      {
        id: 4,
        img_src: "/images/hr_img_03.png",
        spot: "4지점",
        address_txt: "인천시 연수구 인천타워대로 323 송도 센트로드 B동 (송도동 30-3) 31층 전체",
      },
    ],
  });
}

export const jobsInfoLocalRepo = {
  async get() {
    return read();
  },
  async update(newData) {
    write(newData);
    return read();
  }
};
