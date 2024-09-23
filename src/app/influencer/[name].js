import { useRouter } from 'next/router';

const InfluencerFeed = () => {
  const router = useRouter();
  const { name, image, followers } = router.query;

  return (
    <div>
      <h1>{name}</h1>
      <img src={image} alt={name} />
      <p>Followers: {followers}</p>
      {/* Add the influencer's feed content */}
    </div>
  );
};

export default InfluencerFeed;
