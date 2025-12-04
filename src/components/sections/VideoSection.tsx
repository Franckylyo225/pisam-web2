import { Play, Film } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import pisamAerialView from "@/assets/pisam-aerial-view.jpg";

const VideoSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="video" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Title at top */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Film className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Visite virtuelle</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight">
            Explorez notre Univers de Soins et d'Attention
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-pisam-turquoise mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Video thumbnail - centered and large */}
        <div className="max-w-5xl mx-auto">
          <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-pisam-lg">
              <img
                src={pisamAerialView}
                alt="Présentation vidéo de la PISAM"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-pisam-teal/30 group-hover:bg-pisam-teal/20 transition-colors duration-300" />
              
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-8 w-8 md:h-12 md:w-12 text-pisam-teal fill-pisam-teal ml-1" />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pisam-turquoise/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
          <DialogTitle className="sr-only">Vidéo de présentation PISAM</DialogTitle>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Présentation PISAM"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default VideoSection;
