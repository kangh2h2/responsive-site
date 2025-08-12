import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommonSwiper from '../../components/commonSwiper';
import { jobsInfoRepo } from '../../repos';
import useScrollEffect from '../../hooks/useScrollEffect';


export default function Info() {
  const [info, setInfo] = useState({ offices: [], interviews: [], addresses: [] });

    useEffect(() => {
        (async () => {
        const data = await jobsInfoRepo.get();
        setInfo(data || { offices: [], interviews: [], addresses: [] });
        })();
    }, []);
  
    useScrollEffect(
        { deps: [info.offices.length, info.interviews.length, info.addresses.length] }
    );


    const officeSlides = info.offices.map(({img_src}, idx) => (
        <img key={idx} src={img_src} alt="회사 사옥 이미지" />
    ));

    const interviewItems = info.interviews.map(({ id, href, title }) => (
        <li key={id} className="ani-up">
        <div className="interview-box">
            <iframe src={href} title={title} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </div>
        <dl className="flex-center">
            <dt lang="en" translate="no">Interview</dt>
            <dd>영업부</dd>
        </dl>
        <a href={href} target="_blank" rel="noopener noreferrer">
            <h3>{title}</h3>
        </a>
        </li>
    ));

  const addressItems = info.addresses.map(({ id, img_src, address_txt, spot }) => (
    <li key={id} className="ani-scale">
      <div className="img-box">
        <img src={img_src} alt="지점 이미지" />
      </div>
      <div className="adress-box">
        <h4 lang="en" translate="no">KS AUTOPLAN</h4>
        <h3>{spot}</h3>
        <div>{address_txt}</div>
      </div>
    </li>
  ));

  return (
    <div className="hr">
      {/* 상단 소개 섹션 */}
      <section className="info-content ic-01">
        <div className="inner">
          <h2>인재가 회사의<br />가장 중요한 자산입니다.</h2>
          <ul className="flex-center txt-center">
            <li className="ani-scale">
                <i><img className="img-responsive" src="/images/ico_hr_01.svg" alt="아이콘 1"></img></i>
                <h3 lang="en" translate="no">FREE</h3>
                <div>자유롭고 건강한 기업문화 추구</div>
            </li>
            <li className="ani-scale">
                <i><img className="img-responsive" src="/images/ico_hr_02.svg" alt="아이콘 2"></img></i>
                <h3 lang="en" translate="no">BEST</h3>
                <div>최선을 다해 이루는 경쟁력과 성과</div>
            </li>
            <li className="ani-scale">
                <i><img className="img-responsive" src="/images/ico_hr_03.svg" alt="아이콘 3"></img></i>
                <h3 lang="en" translate="no">PEOPLE</h3>
                <div>사람이 가장 소중한 함께 성장하는 기업</div>
            </li>
          </ul>
        </div>
      </section>

      {/* 사옥 + 인터뷰 */}
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
                    autoplay: { delay: 4000, disableOnInteraction: false },
                    loop: true,
                }}
                />
            </div>

            <h2 className="ani-up">KS인의 인터뷰</h2>
            <ul className="grid-wrap">{interviewItems}</ul>
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="info-content ic-03">
        <div className="inner">
          <h2 className="ani-up">오시는 길</h2>
          <ul className="grid-wrap">{addressItems}</ul>
        </div>
      </section>

      {/* 지원 안내 */}
      <section className="info-content ic-04">
        <div className="inner">
          <h2 className="ani-up">
            자동차 산업의 혁신적인 기업 KS그룹이
            <span className="br"></span>
            다양한 분야에서 역량을 갖춘 인재를 모십니다.
          </h2>
          <Link to="/hr/list" className="flex-center ani-up">
            입사 지원하기 <img src="/images/ico_arrow_light.svg" alt="화살표" />
          </Link>
        </div>
      </section>
    </div>
  );
}
