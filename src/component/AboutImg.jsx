import React from 'react';

const AboutImg = () => {
  const leftFeatures = [
    {
      title: 'Maximum Purity',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit.',
      icon: './purity.png'
    },
    {
      title: 'Chlorine Free',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit.',
      icon: './chlorine.png'
    },
    {
      title: '5 Steps Filtration',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit.',
      icon: './filter.png'
    }
  ];

  const rightFeatures = [
    {
      title: 'Healthy Water',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit.',
      icon: './healthy.png'
    },
    {
      title: 'Sustainable Bottles',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit.',
      icon: './subs.png'
    },
    {
      title: 'Convenient Delivery',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit.',
      icon: 'https://img.icons8.com/color/48/000000/delivery.png'
    }
  ];

  return (
    <div className="flex justify-center items-center py-10">
      <div className="grid grid-cols-3 gap-8 max-w-7xl w-full px-4">
        <div className="flex flex-col justify-center space-y-8">
          {leftFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <img src={feature.icon} alt={`${feature.title} Icon`} className="w-10 h-10" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center">
          <img
            src="./bottle2.png" 
            alt="Feature Illustration"
            className="w-104 h-74"
          />
        </div>

        <div className="flex flex-col justify-center space-y-8">
          {rightFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <img src={feature.icon} alt={`${feature.title} Icon`} className="w-10 h-10" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutImg;
