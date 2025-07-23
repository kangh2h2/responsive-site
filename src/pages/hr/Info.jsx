import { Link } from 'react-router-dom';
import CommonSwiper from '../../components/commonSwiper';

const officeSlidesData = [
    { img_src: "/images/hr_img_01.png" },
    { img_src: "/images/hr_img_01.png" },
];

const interviewData = [
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
];

const addressData = [
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
];

const officeSlides = officeSlidesData.map(({img_src}, idx) => (
    <>
        <img key={idx} src={img_src} alt="회사 사옥 이미지"></img>
    </>
))

const interviewItems = interviewData.map(({ id, href, title }) => (
    <li key={id} className="ani-up">
        <div className="interview-box">
            <iframe
                src={href}
                title={title}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
            ></iframe>
        </div>
        <dl className="flex-center">
            <dt>Interview</dt>
            <dd>영업부</dd>
        </dl>
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            <h3>{title}</h3>
        </a>
    </li>
));

const addressItems = addressData.map(({ id, img_src, address_txt, spot }) => (
    <li key={id} className="ani-scale">
        <div className="img-box">
            <img src={img_src} alt="지점 이미지"></img>
        </div>
        <div className="adress-box">
            <h4>KS AUTOPLAN</h4>
            <h3>{spot}</h3>
            <div>{address_txt}</div>
        </div>
    </li>
));

function Info() {
    return (
        <>
            <div className="hr">
                <section className="info-content ic-01">
                    <div className="inner">
                        <h2>인재가 회사의<br />가장 중요한 자산입니다.</h2>
                        <ul className="flex-center txt-center">
                            <li className="ani-scale">
                                <i><img className="img-responsive" src="/images/ico_hr_01.svg" alt="아이콘 1"></img></i>
                                <h3>FREE</h3>
                                <div>자유롭고 건강한 기업문화 추구</div>
                            </li>
                            <li className="ani-scale">
                                <i><img className="img-responsive" src="/images/ico_hr_02.svg" alt="아이콘 2"></img></i>
                                <h3>BEST</h3>
                                <div>최선을 다해 이루는 경쟁력과 성과</div>
                            </li>
                            <li className="ani-scale">
                                <i><img className="img-responsive" src="/images/ico_hr_03.svg" alt="아이콘 3"></img></i>
                                <h3>PEOPLE</h3>
                                <div>사람이 가장 소중한 함께 성장하는 기업</div>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="info-content ic-02">
                    <div className="inner">
                        <h2 className="ani-up">KS오토플랜 <span className="fc-m">사옥</span>을 소개합니다.</h2>
                        <div className="txt ani-up">KS는 쾌적한 업무 공간을 마련하여 임직원들의 업무 환경을 개선하기 위해 노력하고 있습니다.</div>
                        <div className="officeSwiper ani-up">
                            <CommonSwiper
                                slides={officeSlides}
                                options={{
                                    slidesPerView: 1,
                                    pagination: true,
                                    autoplay: {
                                        delay: 4000,
                                        disableOnInteraction: false,
                                    },
                                    loop: true,
                                }}
                            />
                        </div>

                        <h2 className="ani-up">KS인의 인터뷰</h2>
                        <ul className="grid-wrap">
                            {interviewItems}
                        </ul>
                    </div>
                </section>

                <section className="info-content ic-03">
                    <div className="inner">
                        <h2 className="ani-up">오시는 길</h2>
                        <ul className="grid-wrap">
                            {addressItems}
                        </ul>
                    </div>
                </section>

                <section className="info-content ic-04">
                    <div className="inner">
                        <h2 className="ani-up">
                            자동차 산업의 혁신적인 기업 KS그룹이
                            <span className="br"></span>
                            다양한 분야에서 역량을 갖춘 인재를 모십니다.
                        </h2>
                        <Link to="/hr/list" className="flex-center ani-up">
                            입사 지원하기 <img src="/images/ico_arrow_light.svg" alt="화살표"></img>
                        </Link>
                    </div>
                </section>
            </div>
            
        </>
    )
}

export default Info
