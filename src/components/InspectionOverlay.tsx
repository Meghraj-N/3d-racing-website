
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Info, Gauge, Settings2, X, ChevronRight } from 'lucide-react';

interface InspectionOverlayProps {
  selectedPart: string | null;
  onClose: () => void;
}

const PART_DATA: Record<string, any> = {
  'engine': {
    title: 'V8 Hybrid Powertrain',
    description: 'A masterpiece of modern engineering combining a high-revving 4.0L twin-turbo V8 with dual electric motors on the front axle for instantaneous torque delivery.',
    stats: {
      'Horsepower': 986,
      '0-60 mph': '2.1s',
      'Top Speed': '211 mph'
    },
    designerNote: 'We focused on lowering the center of gravity while maximizing cooling efficiency. The hybrid system seamlessly fills torque gaps during gear shifts.'
  },
  'rims': {
    title: 'Aerodynamic Wheels & Carbon Ceramic Brakes',
    description: 'Forged magnesium alloy wheels paired with 16-inch carbon ceramic rotors and 6-piston monoblock calipers.',
    stats: {
      'Wheel Size': '20" F / 21" R',
      'Rotor Size': '400mm F / 380mm R',
      'Weight Savings': '-15 lbs / corner'
    },
    designerNote: 'The wheel spoke design acts as an active aerodynamic extractor, pulling turbulent air out from the wheel wells to reduce drag.'
  },
  'aero': {
    title: 'Active Aero Carbon Monocoque',
    description: 'Full carbon fiber chassis integrated with active aerodynamic flaps that deploy under heavy braking and cornering.',
    stats: {
      'Downforce at 150mph': '1,200 lbs',
      'Drag Coefficient': '0.28 Cd',
      'Chassis Weight': '185 lbs'
    },
    designerNote: 'Form follows function. Every curve was sculpted in the wind tunnel. The rear wing adjusts its angle of attack within milliseconds based on steering input.'
  }
};

export default function InspectionOverlay({ selectedPart, onClose }: InspectionOverlayProps) {
  if (!selectedPart || !PART_DATA[selectedPart]) return null;

  const data = PART_DATA[selectedPart];

  return (
    <div className="absolute right-4 top-4 bottom-4 w-96 z-10 flex flex-col gap-4 animate-in slide-in-from-right-8 duration-500">
      <Card className="bg-card/90 backdrop-blur-md border-primary/20 shadow-2xl flex-1 flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-2xl font-display uppercase tracking-widest text-primary flex items-center gap-2">
              <Settings2 className="w-5 h-5" />
              {data.title}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-primary/20 rounded-full h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mt-2 font-body">
            {data.description}
          </p>
        </CardHeader>
        
        <Separator className="bg-border/50" />
        
        <CardContent className="flex-1 overflow-y-auto py-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Gauge className="w-4 h-4 text-primary" />
              Performance Specs
            </h3>
            <div className="space-y-3">
              {Object.entries(data.stats).map(([key, value]) => (
                <div key={key} className="bg-background/50 p-3 rounded-lg border border-border/50">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{key}</div>
                  <div className="text-lg font-display text-foreground">{String(value)}</div>
                  {typeof value === 'number' && (
                    <Progress value={(value / 1000) * 100} className="h-1 mt-2 bg-primary/20" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/30 p-4 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2 mb-2">
              <Info className="w-4 h-4" />
              Designer's Log
            </h3>
            <p className="text-sm text-foreground/80 italic font-body leading-relaxed">
              "{data.designerNote}"
            </p>
          </div>
        </CardContent>
        
        <div className="p-4 border-t border-border/50">
          <Button className="w-full font-display uppercase tracking-widest group">
            Run Diagnostics
            <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
