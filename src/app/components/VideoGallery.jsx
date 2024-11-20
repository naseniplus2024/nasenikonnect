// components/VideoGallery.js

export default function VideoGallery({ videos }) {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        <p>No recorded videos available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <video
            className="w-full h-56 object-cover"
            controls
            poster={video.thumbnail}
            src={video.url}
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{video.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{video.description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{video.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
