interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function UserProfilePage({ params }: PageProps) {
 const { username } = await params;

 return (
  <div>
   <h1>{username}'s Profile</h1>
   <p>This is the profile page for {username}.</p>
  </div>
 );
}