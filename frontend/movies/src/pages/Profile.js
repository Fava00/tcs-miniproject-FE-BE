import { Suspense } from 'react';
import { useLoaderData, Await, redirect } from 'react-router-dom';

import ProfileItem from '../components/ProfileItem';

// const DUMMY_PROFILE = {
//   username: 'testuser',
//   joined: 2018,
//   isSignedIn: false,
// }

function ProfilePage() {
  const { user } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={user}>
        {( loadedUser ) => <ProfileItem userData={loadedUser} />}
      </Await>
    </Suspense>
  );
}

export default ProfilePage;

/* <ProfileItem userData={DUMMY_PROFILE} /> */


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

export async function action({ request }) {
  const response = await fetch('http://localhost:8080/profile', { method: request.method });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not log out user.' }), {
      status: 500,
    });
  }

  return redirect('/profile');
}