import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          About Me
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden mb-6">
              <Image
                src="/placeholder.svg?height=256&width=256"
                alt="Professor Jane Smith"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold">Prof. Jane Smith, Ph.D.</h3>
            <p className="text-muted-foreground mb-4">
              Professor of Computer Science
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary">AI</Badge>
              <Badge variant="secondary">Machine Learning</Badge>
              <Badge variant="secondary">Data Science</Badge>
              <Badge variant="secondary">Computer Vision</Badge>
            </div>
          </div>
          <div className="md:col-span-2">
            <Tabs defaultValue="bio" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bio">Biography</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="publications">Publications</TabsTrigger>
              </TabsList>
              <TabsContent value="bio" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <p className="mb-4">
                      I am a Professor of Computer Science at University of
                      Technology, specializing in artificial intelligence and
                      machine learning. With over 15 years of experience in
                      academia, I have dedicated my career to advancing the
                      field of AI and educating the next generation of computer
                      scientists.
                    </p>
                    <p className="mb-4">
                      I received my Ph.D. in Computer Science from Stanford
                      University in 2008, where my research focused on neural
                      networks and deep learning algorithms. Prior to that, I
                      earned my Master&apos;s degree from MIT and my
                      Bachelor&apos;s from UC Berkeley.
                    </p>
                    <p>
                      Outside of academia, I serve as a consultant for several
                      tech companies and am an active member of the Association
                      for Computing Machinery (ACM) and the Institute of
                      Electrical and Electronics Engineers (IEEE).
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="research" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="text-lg font-semibold mb-2">
                      Current Research Focus
                    </h4>
                    <p className="mb-4">
                      My research lab is currently focused on developing novel
                      approaches to explainable AI, making complex machine
                      learning models more interpretable and transparent for
                      end-users.
                    </p>
                    <h4 className="text-lg font-semibold mb-2">
                      Research Areas
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                      <li>Explainable Artificial Intelligence (XAI)</li>
                      <li>Deep Learning for Computer Vision</li>
                      <li>Natural Language Processing</li>
                      <li>Ethical AI and Algorithmic Fairness</li>
                    </ul>
                    <h4 className="text-lg font-semibold mb-2">
                      Lab Information
                    </h4>
                    <p>
                      The Smith AI Lab consists of 5 Ph.D. students, 3
                      postdoctoral researchers, and several undergraduate
                      research assistants. We collaborate with industry partners
                      including Google, Microsoft, and IBM.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="publications" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="text-lg font-semibold mb-2">
                      Selected Publications
                    </h4>
                    <ul className="space-y-4">
                      <li>
                        <p className="font-medium">
                          Smith, J., Johnson, A., & Lee, K. (2023)
                        </p>
                        <p>Advances in Explainable AI for Medical Imaging</p>
                        <p className="text-sm text-muted-foreground">
                          Journal of Artificial Intelligence in Medicine, 45(2),
                          112-128
                        </p>
                      </li>
                      <li>
                        <p className="font-medium">
                          Smith, J., & Williams, R. (2022)
                        </p>
                        <p>Ethical Considerations in Deploying AI Systems</p>
                        <p className="text-sm text-muted-foreground">
                          Proceedings of the International Conference on AI
                          Ethics, 78-92
                        </p>
                      </li>
                      <li>
                        <p className="font-medium">
                          Brown, T., Smith, J., & Davis, M. (2021)
                        </p>
                        <p>
                          Neural Networks for Real-time Object Detection: A
                          Comparative Study
                        </p>
                        <p className="text-sm text-muted-foreground">
                          IEEE Transactions on Pattern Analysis and Machine
                          Intelligence, 43(3), 334-349
                        </p>
                      </li>
                      <li>
                        <p className="font-medium">Smith, J. (2020)</p>
                        <p>The Future of Human-AI Collaboration in Education</p>
                        <p className="text-sm text-muted-foreground">
                          Educational Technology & Society, 23(4), 45-61
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
