
import React from 'react';

const CommunityView: React.FC = () => {
  const hacks = [
    {
      id: 1,
      user: "GourmetGab",
      title: "Leftover Pasta Frittata",
      desc: "Turn yesterday's spaghetti into a crunchy breakfast frittata!",
      upvotes: 245,
      image: "https://picsum.photos/400/300?random=11"
    },
    {
      id: 2,
      user: "ZeroWasteMom",
      title: "Broccoli Stem Pesto",
      desc: "Don't throw away those stems! Blend with garlic and olive oil.",
      upvotes: 189,
      image: "https://picsum.photos/400/300?random=12"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-xl font-bold text-slate-800 font-display">Leftover Hacks</h2>
        <button className="bg-emerald-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      <div className="space-y-6">
        {hacks.map(hack => (
          <div key={hack.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group">
            <div className="relative h-48">
              <img src={hack.image} className="w-full h-full object-cover" alt={hack.title} />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-[10px] text-emerald-600">
                  <i className="fa-solid fa-user"></i>
                </div>
                <span className="text-[10px] font-bold text-slate-800">{hack.user}</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-slate-800 text-lg mb-2">{hack.title}</h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2">{hack.desc}</p>
              <div className="flex justify-between items-center">
                <button className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-xl active:scale-95 transition-all">
                  <i className="fa-solid fa-arrow-up"></i>
                  {hack.upvotes}
                </button>
                <div className="flex gap-4 text-slate-300">
                  <i className="fa-solid fa-share-nodes cursor-pointer hover:text-emerald-500"></i>
                  <i className="fa-solid fa-bookmark cursor-pointer hover:text-emerald-500"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityView;
