import Image from 'next/image';

export const metadata = {
  title: 'Meet the Team',
  description: 'Meet the dedicated team of journalists and professionals at Online Kanda.',
};

const teamMembers = [
  {
    name: "Rajiv Dhungana",
    role: "Editor-in-Chief",
    imageUrl: "/images/Rajiv.jpg",
    bio: "Rajiv leads our editorial vision with over 15 years of experience in journalism, ensuring every story meets our standard of integrity."
  },
  {
    name: "Sulav Subedi",
    role: "Lead Sports Correspondent",
    imageUrl: "/images/sulav.jpg",
    bio: "Sulav covers all major national and international sporting events, bringing insightful analysis to our readers."
  },
  {
    name: "Shikshit Gurung",
    role: "Economics & Business Reporter",
    imageUrl: "/images/Shikshit.jpg",
    bio: "Shikshit specializes in market trends and economic policy, providing in-depth coverage of the financial world."
  },
];

export default function TeamPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">Meet Our Dedicated Team</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Behind every headline is a team of passionate individuals committed to bringing you accurate, timely, and impactful news.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 justify-items-center">
        {teamMembers.map((member) => (
          <div key={member.name} className="text-center max-w-sm p-6 bg-gray-50 rounded-lg shadow-sm"> 
            <div className="relative h-60 w-60 mx-auto rounded-full overflow-hidden shadow-lg mb-6 border-4 border-blue-600">
              <Image 
                src={member.imageUrl} 
                alt={`Photo of ${member.name}`}
                fill
                style={{ objectFit: 'cover' }} 
                className="transition-transform duration-300 hover:scale-105" 
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
            <p className="text-blue-600 font-semibold text-lg mb-3">{member.role}</p>
            <p className="mt-2 text-base text-gray-700 leading-relaxed">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}