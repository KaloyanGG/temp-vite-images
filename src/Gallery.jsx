import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useGlobalContext } from './context';

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_URL
}`;

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: () => axios.get(`${url}&query=${searchTerm}`),
  });
  if (isLoading)
    return (
      <section className='image-container'>
        <h4>Loading...</h4>
      </section>
    );
  if (isError)
    return (
      <section className='image-container'>
        <h4>There was an error...</h4>
      </section>
    );
  const results = data.data.results;
  if (results.length < 1)
    return (
      <section className='image-container'>
        <h4>No results found...</h4>
      </section>
    );
  return (
    <section className='image-container'>
      {results.map((item) => {
        const url = item?.urls?.regular;
        return <img src={url} alt='' key={item.id} className='img' />;
      })}
    </section>
  );
};
export default Gallery;
