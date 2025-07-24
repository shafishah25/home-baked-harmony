import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-heading font-bold text-center mb-12">
          About Delicious Bakers
        </h1>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-heading font-semibold mb-6">
              Our Story
            </h2>
            <p className="text-muted-foreground mb-4">
              Welcome to Delicious Bakers, where every treat is crafted with love and passion. 
              Our journey began in a small home kitchen with a simple dream: to share the joy 
              of freshly baked goods with our community.
            </p>
            <p className="text-muted-foreground mb-4">
              What started as weekend baking for friends and family has grown into a beloved 
              local bakery, but we've never forgotten our roots. Every cake, cookie, and loaf 
              of bread is still made with the same care and attention to detail that we put 
              into those very first batches.
            </p>
            <p className="text-muted-foreground">
              We believe that the best ingredients make the best baked goods. That's why we 
              source only the finest flour, butter, chocolate, and seasonal fruits to create 
              treats that not only taste amazing but also bring people together.
            </p>
          </div>
          <div className="bg-muted aspect-square rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Founder's Photo</p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-semibold text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-heading font-semibold text-xl mb-4">Quality</h3>
                <p className="text-muted-foreground">
                  We use only the finest ingredients and traditional techniques to ensure 
                  every product meets our high standards.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-heading font-semibold text-xl mb-4">Freshness</h3>
                <p className="text-muted-foreground">
                  Everything is baked fresh daily. We believe that freshness makes all 
                  the difference in taste and quality.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-heading font-semibold text-xl mb-4">Community</h3>
                <p className="text-muted-foreground">
                  We're proud to be part of this community and love creating treats for 
                  life's special moments and everyday joys.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Meet the Founder */}
        <div className="bakery-gradient rounded-lg p-8">
          <h2 className="text-3xl font-heading font-semibold text-center mb-8">
            Meet the Founder
          </h2>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-4">
              "Baking has always been my passion. There's something magical about mixing 
              simple ingredients and creating something that brings joy to people's faces. 
              When I see a customer's smile after tasting one of our cakes, I know we've 
              done something special."
            </p>
            <p className="font-semibold">- Sarah Baker, Founder & Head Baker</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;