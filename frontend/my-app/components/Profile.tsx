import { useState } from 'react';

const Profile = () => {
  const [username, setUsername] = useState('shadcn');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('I own a computer.');
  const [urls, setUrls] = useState([
    'https://shadcn.com',
    'https://twitter.com/shadcn',
  ]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <p className="mb-6 text-gray-600">This is how others will see you on the site.</p>

      <label className="block mb-4">
        <span className="block text-sm font-medium text-gray-700">Username</span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <p className="mt-1 text-sm text-gray-500">
          This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
        </p>
      </label>

      <label className="block mb-4">
        <span className="block text-sm font-medium text-gray-700">Email</span>
        <select
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select a verified email to display</option>
          <option value="email1@example.com">email1@example.com</option>
          <option value="email2@example.com">email2@example.com</option>
        </select>
        <p className="mt-1 text-sm text-gray-500">
          You can manage verified email addresses in your email settings.
        </p>
      </label>

      <label className="block mb-4">
        <span className="block text-sm font-medium text-gray-700">Bio</span>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <p className="mt-1 text-sm text-gray-500">
          You can @mention other users and organizations to link to them.
        </p>
      </label>

      <label className="block mb-4">
        <span className="block text-sm font-medium text-gray-700">URLs</span>
        {urls.map((url, index) => (
          <input
            key={index}
            type="url"
            value={url}
            onChange={(e) => {
              const newUrls = [...urls];
              newUrls[index] = e.target.value;
              setUrls(newUrls);
            }}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ))}
        <button
          onClick={() => setUrls([...urls, ''])}
          className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add URL
        </button>
      </label>

      <button
        onClick={() => alert('Profile updated')}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Update profile
      </button>
    </div>
  );
};

export default Profile;
