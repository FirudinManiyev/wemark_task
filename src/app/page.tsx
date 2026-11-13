import { SiteFooter } from "@/components/layout/site-footer";
import { About } from "@/components/xschool/about";
import { Faq } from "@/components/xschool/faq";
import { Founder } from "@/components/xschool/founder";
import { Hero } from "@/components/xschool/hero";
import { Marquee } from "@/components/xschool/marquee";
import { Programs } from "@/components/xschool/programs";
import { getXSchoolData } from "@/lib/api/xschool";
import { cleanRichText } from "@/lib/rich-text";

export default async function Home() {
  const data = await getXSchoolData();

  return (
    <main>
      <Hero title={data.banner_title} image={data.banner_image} />
      <About
        title={data.about_title}
        description={data.about_description}
        images={data.about_images}
      />
      <Founder founders={data.founders} />
      <Programs programs={data.programs} />
      <Marquee lines={data.text_slider} />
      <Faq
        title={data.faq_title}
        items={data.xschool_faq.map((item) => ({
          question: item.question,
          answer: cleanRichText(item.answer),
        }))}
      />
      <SiteFooter />
    </main>
  );
}
