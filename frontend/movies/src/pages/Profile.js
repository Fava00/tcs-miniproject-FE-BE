// import { Suspense } from 'react';
// import { useLoaderData, Await } from 'react-router-dom';

import ProfileItem from '../components/ProfileItem';

const DUMMY_PROFILE = {
  username: 'testuser',
  joined: 2018,
  isSignedIn: false,
}

function ProfilePage() {
  // const { user } = useLoaderData();

  return (
    // <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
    //   <Await resolve={user}>
    //     {( loadedUser ) => <ProfileItem userData={loadedUser} />}
    //   </Await>
    // </Suspense>
    <ProfileItem userData={DUMMY_PROFILE} />
  );
}

export default ProfilePage;


export async function loader() {
  const response = await fetch('http://localhost:8080/profile');

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch user data.' }), {
      status: 500,
    });
  } else {
    return response;
  }
}