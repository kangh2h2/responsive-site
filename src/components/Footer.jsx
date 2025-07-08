import './Footer.css';

import React from 'react'

function Footer() {
  return (
    <>
      <footer>
        <div className="inner">
            <h1>KS Group</h1>
            <div className="adress-wrap">
                <dl>
                    <dt className="bold">본사.</dt>
                    <dd>인천 연수구 갯벌로12, 미추홀타워 (본관) 15층</dd>
                </dl>
                <dl>
                    <dt className="bold">2지점.</dt>
                    <dd>인천 연수구 인천타워대로 323, 센트로드 B동 31층</dd>
                </dl>
                <dl>
                    <dt className="bold">3지점.</dt>
                    <dd>인천 연수구 인천타워대로 99, 애니오션 빌딩 14층</dd>
                </dl>
                <dl>
                    <dt className="bold">4지점.</dt>
                    <dd>인천 연수구 송도미래로11번길 27, 스마트스퀘어 B동 20층</dd>
                </dl>
                <dl>
                    <dt className="bold">수출지점.</dt>
                    <dd>인천 연수구 능허대로 208, B동 108~110호 송도유원지 수출 단지</dd>
                </dl>
            </div>
            <div className="info-wrap">
                <div className="info-txt">
                    <span>대표. <b>윤기웅, 김민석</b></span>
                    <span>대표번호. <b>1833-2802</b></span>
                    <span>사업자 등록번호. <b>592-87-01120</b></span>
                    <div className="copyright">© 2025 KS-GROUP ALL RIGHTS RESERVED</div>
                </div>
                <div className="sns-wrap flex-center">
                    <a href="https://youtube.com/@KS오토플랜" target="_blank" rel="noopener noreferrer"><img src="/images/ico_youtube.svg" alt="유투브"></img></a>
                    <a href="https://www.instagram.com/ksautoplan" target="_blank" rel="noopener noreferrer"><img src="/images/ico_insta.svg" alt="인스타"></img></a>
                    <a href="https://blog.naver.com/ksautoplan2022" target="_blank" rel="noopener noreferrer"><img src="/images/ico_blog.svg" alt="블로그"></img></a>
                </div>
            </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
