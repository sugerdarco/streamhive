import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllVideos } from '../services/videoService';
import VideoGrid from '../components/video/VideoGrid';
import { SkeletonGrid } from '../components/common/Loader';
import Pagination from '../components/common/Pagination';
import { SORT_OPTIONS, SORT_ORDERS } from '../utils/constants';
import './Home.css';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [sortType, setSortType] = useState('views');
  const [sortBy, setSortBy] = useState('descending');
  const [page, setPage] = useState(1);

  const query = searchParams.get('query') || '';

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const { data } = await getAllVideos({ query, page, limit: 20, sortType, sortBy });
        setVideos(data.data || []);
      } catch {
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [query, sortType, sortBy, page]);

  return (
    <div className="page-container">
      <div className="home-header">
        <h1 className="page-title">{query ? `Results for "${query}"` : 'Trending Videos'}</h1>
        <div className="home-filters">
          <select className="home-select" value={sortType} onChange={(e) => setSortType(e.target.value)} id="sort-type">
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <select className="home-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} id="sort-order">
            {SORT_ORDERS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? <SkeletonGrid count={8} /> : <VideoGrid videos={videos} />}

      {!loading && videos.length > 0 && (
        <Pagination page={page} hasMore={videos.length >= 20} onPageChange={setPage} />
      )}
    </div>
  );
};

export default Home;
