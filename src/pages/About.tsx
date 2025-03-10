
import { WalletProvider } from '../context/WalletContext';
import Navbar from '../components/layout/Navbar';
import AnimatedGradient from '../components/AnimatedGradient';

const About = () => {
  return (
    <WalletProvider>
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedGradient />
        <Navbar />
        <main className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-guardian-green to-guardian-blue">
              About Guardian-IO
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl mb-6">
                Guardian-IO is revolutionizing the agricultural sector by creating a seamless bridge between blockchain technology and real-world farming practices.
              </p>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Our Mission</h2>
              <p>
                Our mission is to empower farmers across the globe with transparent, secure, and efficient tools that increase productivity, ensure fair compensation, and promote sustainable farming practices.
              </p>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Our Vision</h2>
              <p>
                We envision a world where agricultural supply chains are fully transparent, farmers receive fair compensation for their work, and consumers can verify the origins and journey of their food.
              </p>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Core Values</h2>
              <ul className="space-y-4 mb-8">
                <li><strong>Transparency:</strong> All transactions and supply chain movements are recorded on the blockchain for complete visibility.</li>
                <li><strong>Empowerment:</strong> We provide farmers with the tools and knowledge to maximize their yields and profits.</li>
                <li><strong>Sustainability:</strong> We promote farming practices that are environmentally responsible and economically viable.</li>
                <li><strong>Innovation:</strong> We continuously integrate cutting-edge technology to solve agricultural challenges.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Our Team</h2>
              <p>
                Guardian-IO is led by a diverse team of experts from agriculture, blockchain technology, artificial intelligence, and sustainable development. Together, we're working to create meaningful change in how the world produces and consumes food.
              </p>
            </div>
          </div>
        </main>
      </div>
    </WalletProvider>
  );
};

export default About;
