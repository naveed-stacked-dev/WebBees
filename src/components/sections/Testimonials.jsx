import React from 'react';
import { Marquee } from '../ui/marquee';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  { name: 'Alice M.', role: 'Frontend Developer at Stripe', text: 'WebBees fundamentally changed how I approach coding. The mentorship felt like a real startup environment.' },
  { name: 'John D.', role: 'Student', text: 'Before WebBees, I was stuck in tutorial hell. Now, I have full-stack projects that recruiters actually care about.' },
  { name: 'Sarah K.', role: 'Software Engineer at Google', text: 'The React and DSA classes were phenomenal. Syed is an incredible mentor who simplifies complex topics.' },
  { name: 'Michael T.', role: 'Freelance UX Designer', text: 'I learned more about design engineering in 3 months here than I did in 4 years of college.' },
  { name: 'Emily R.', role: 'Backend Engineer', text: 'The real-world projects we built helped me ace my technical interviews. Highly recommend WebBees to anyone.' },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative min-h-[70vh] py-24 bg-black/60 border-t border-white/5 overflow-hidden flex flex-col justify-center gap-12">
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Community <span className="gradient-text">Voices</span></h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Hear from our students and mentees who have transformed their careers.
        </p>
      </div>

      <div className="w-full relative z-10">
        <Marquee speed="normal" pauseOnHover className="py-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="w-[400px] bg-cyber-black border-white/10 flex-shrink-0 cursor-pointer hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <CardTitle className="text-lg text-white">{t.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <Quote className="ml-auto w-6 h-6 text-white/10" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 italic">"{t.text}"</p>
              </CardContent>
            </Card>
          ))}
        </Marquee>

        {/* Fade overlays for marquee */}
        <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-20" />
        <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-black/60 to-transparent pointer-events-none z-20" />
      </div>
    </section>
  );
}
