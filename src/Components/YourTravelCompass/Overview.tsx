import React from 'react'

export const Overview = () => {
  return (
    <div>
       
            <div className="p-4 text-gray-700">
              <h3 className="text-xl font-semibold mb-2">Discover New Horizons</h3>
              <p className="mb-4">Experience the excitement of exploring new destinations. From serene beaches to bustling cities, we offer an insider's look at the world's most captivating locations.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
                  <iframe 
                    className="w-full h-full" 
                    src="https://www.youtube.com/embed/Scxs7L0vhZ4" 
                    title="Overview of Destinations 1" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
                  <iframe 
                    className="w-full h-full" 
                    src="https://www.youtube.com/embed/Qmi-Xwq-MEc?si=Qdw_xz2jq7ftmrsn"
                    title="Overview of Destinations 2" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
                  <iframe 
                    className="w-full h-full" 
                    src="https://www.youtube.com/embed/K8xOnr57TSE?si=lFbYub7pkfjjgP-s" 
                    title="Overview of Destinations 3" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
         
    </div>
  )
}
