import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000',
};

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '300px',
};

type SlideProps = {
  slideImages: any;
  id: string;
};

export const Slider = ({ slideImages, id }: SlideProps) => {
  return (
    <div
      className="slide-container"
      style={{
        position: 'absolute',
        margin: '0 auto',
        left: 0,
        right: 0,
        top: 300,
        width: '30%',
      }}
    >
      <Slide>
        {slideImages.map((item: any) => {
          return (
            <div key={id}>
              <div style={{ ...divStyle, backgroundImage: `url(${item.url})` }}>
                <span style={spanStyle}>{item.title}</span>
              </div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
};
