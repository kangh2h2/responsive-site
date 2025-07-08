import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const CommonSwiper = ({ slides = [], modules = [], options = {} }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, Scrollbar, ...modules]}
      navigation={options.navigation}
      scrollbar={options.scrollbar}
      {...options}
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CommonSwiper;
