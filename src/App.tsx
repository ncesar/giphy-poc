import './App.css';
import { Gif, SearchType, searchGifs } from './api';
import { useEffect, useState } from 'react';
import { Slider } from './components/Slider';

const getSearchHistory = (): string[] => {
  try {
    const history = localStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [showSlider, setShowSlider] = useState(false);
  const [searchHistory, setSearchHistory] =
    useState<string[]>(getSearchHistory);
  const [selectedImageId, setSelectedImageId] = useState<string>('');

  const handleData = async (event: any) => {
    event.preventDefault();
    const response = await searchGifs(searchTerm, SearchType.SEARCH);
    setData(response);
    setSearchHistory((prevHistory) => [...prevHistory, searchTerm]);
  };

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const onThumbnailClickHandler = (id: string) => {
    setShowSlider(true);
    setSelectedImageId(id);
  };

  return (
    <div className="App" style={{ position: 'relative' }}>
      <form onSubmit={handleData}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onChangeHandler(event)}
        />
        <button type="submit">Search</button>
      </form>
      <div
        className="container"
        style={{
          filter: showSlider ? 'blur(8px)' : 'none',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
        }}
        onClick={() => setShowSlider(!showSlider)}
      >
        {data.map((item: Gif) => {
          return (
            <div
              key={item.id}
              onClick={() => onThumbnailClickHandler(item.id)}
              style={{
                display: 'flex',
                border: '4px solid #eee',
                width: 'fit-content',
                borderRadius: '5px',
              }}
            >
              <img src={item.url} alt={item.title} />
            </div>
          );
        })}
      </div>
      {showSlider && <Slider slideImages={data} id={selectedImageId} />}
      {JSON.stringify(searchHistory)}
    </div>
  );
}

export default App;
