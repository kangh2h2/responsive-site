import SubVisual from "../components/SubVisual";
import './About.css';

const About = () => (
  <>
    <SubVisual title="KS소개" type="about" bgClass="bg-about" />
    
    <section className="about-content ac-01 txt-center">
      <div className="inner">
        <div className="line-01"></div>
        <h3 className="fc-m">Korea Standard</h3>
        <h1> 
          대한민국 모빌리티 산업의<br />
          표준을 새로 쓰다.
        </h1>
        <div className="line-01 arrow"></div>
        <div className="txt-01 fc-g-2">
          KS그룹은 2018년 인천에서 출발하여, 자동차 산업 전반을 아우르는 모빌리티 중심<br />
          기업군으로 성장해온 종합 그룹입니다.
        </div>
      </div>
    </section>

    <section className="about-content content ac-02 members txt-center">
      <div className="inner">
        <h1>설립 이후 매해 눈에 띄는 성장을 거듭하며,</h1>
        <div className="txt-02">
          현재는 임직원 500명 규모의 전국 최대급 모빌리티 전문 그룹으로 자리매김하였습니다.
        </div>
        <div className="txt-box">임직원</div>
        <dl className="flex-center">
          <dt><img src="/images/ico_people.svg" alt="임직원 아이콘"></img></dt>
          <dd>+ 500</dd>
        </dl>
      </div>
    </section>

    <section className="about-content content ac-02 company txt-center">
      <div className="inner">
        <h1>
          우리는 신차 구매부터<br />
          특장차, 중고차 유통, 중고차 수출, 광고 마케팅까지</h1>
        <div className="txt-02">
          모든 자동차 유통 과정의 전주기를 통합하여 운영하는 국내에서도 드문 구조의 그룹입니다.
        </div>
        <div className="txt-box">계열사</div>
        <dl className="flex-center">
          <dt><img src="/images/ico_company.svg" alt="회사 아이콘"></img></dt>
          <dd>+ 4</dd>
        </dl>
      </div>
    </section>

    <section className="about-content content ac-03">
      <div className="inner flex-center">
        <div className="txt-box">
          <img src="/images/ico_marks.png" alt="따옴표 아이콘"></img>
          <h1>KS그룹은</h1>
          <div className="txt-02">
            자동차 산업에 머무르지 않고<br />
            모빌리티를 중심으로 한<br />
            생활, 공간, 경험의 확장까지<br />
            준비하고 있습니다.
          </div>
        </div>
        <div className="banner-box">
          <div className="banner-txt bg-01">
            <p>통합 플랫폼을 통한</p>
            <h2>서비스 고도화</h2>
          </div>
          <div className="banner-txt bg-02">
            <p>글로벌 네트워크 기반의</p>
            <h2>유통 다각화</h2>
          </div>
          <div className="banner-txt bg-03">
            <p>데이터 기반 운영과 AI 기술 접목을 통한</p>
            <h2>스마트한 전환</h2>
          </div>
        </div>
      </div>
    </section>

    <section className="about-content ac-04">
      <div className="inner">
        <h3 className="fc-s">A New Standard</h3>
        <h1>
          <div className="fc-m">우리는 단순히</div>
          차량을 유통하는 기업이 아닌,
        </h1>
        <div className="txt-01">
          사람과 이동을 연결하고, 브랜드와 고객의 거리를 좁히는 기업으로 <span className="br"></span>
          새로운 기준을 만들어 갑니다.
        </div>

        <div className="video-wrap">
          <video
              src="/videos/sub_content_01.mp4"
              type="video/mp4"
              autoPlay
              muted
              loop
              playsInline
          />
        </div>
      </div>
    </section>
  </>
);

export default About;