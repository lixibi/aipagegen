"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Download, ArrowRight, Star, Zap, Shield, Layout, FileText } from 'lucide-react'
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

// 注意：metadata 需要移动到一个单独的文件中，因为它不能在客户端组件中使用
export default function Home() {
  const { t } = useLanguage()
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full bg-blue-500/95 backdrop-blur-sm text-white border-b border-white/10">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link 
            className="flex items-center space-x-2 hover:scale-105 transition-transform" 
            href="/"
            aria-label={t('nav.home')}
          >
            <Zap className="h-6 w-6" />
            <span className="text-xl font-bold">AipageGen</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {[
              { name: t('nav.home'), href: "#home" },
              { name: t('nav.features'), href: "#features" },
              { name: t('nav.pricing'), href: "#pricing" },
              { name: t('nav.faq'), href: "#faq" },
              { name: t('nav.contact'), href: "#contact" }
            ].map((item) => (
              <Link
                key={item.name}
                className="text-sm font-medium transition-colors hover:text-white/80 hover:scale-105"
                href={item.href}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              variant="secondary"
              className="hidden md:flex items-center hover:bg-white hover:text-blue-500 transition-all hover:scale-105 shadow-lg"
            >
              {t('hero.startButton')}
              <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none animate-fade-in">
                    {t('hero.title')}
                  </h1>
                  <p className="max-w-[600px] text-gray-100 md:text-xl">
                    {t('hero.subtitle')}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-blue-500 hover:bg-blue-50 transition-all hover:scale-105"
                  >
                    {t('hero.startButton')}
                    <Download className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 text-white border-white hover:bg-white hover:text-blue-500 transition-all hover:scale-105 backdrop-blur-sm shadow-xl"
                  >
                    {t('hero.learnMore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-100">
                  {t('hero.freeTrial')}
                </p>
              </div>

              <Carousel className="w-full bg-white/5 rounded-xl backdrop-blur-sm p-4 shadow-2xl">
                <CarouselContent>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Image
                          src="/placeholder.svg"
                          alt={`AI生成的电商详情页示例 ${index + 1}`}
                          className="aspect-[3/2] object-cover rounded-lg shadow-lg hover:scale-[1.02] transition-transform"
                          width={600}
                          height={400}
                          priority={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-white -left-4 lg:-left-12 bg-blue-500/20 hover:bg-blue-500/40" />
                <CarouselNext className="text-white -right-4 lg:-right-12 bg-blue-500/20 hover:bg-blue-500/40" />
              </Carousel>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-blue-500">
                  {t('features.title')}
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('features.subtitle')}
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: FileText,
                  title: t('features.autoContent'),
                  description: t('features.autoContentDesc')
                },
                {
                  icon: Layout,
                  title: t('features.multiStyle'),
                  description: t('features.multiStyleDesc')
                },
                {
                  icon: Shield,
                  title: t('features.infoRemoval'),
                  description: t('features.infoRemovalDesc')
                }
              ].map((feature, index) => (
                <Card key={index} className="transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-2 text-center">
                      <feature.icon className="h-12 w-12 text-blue-500" />
                      <h3 className="text-lg font-medium">{feature.title}</h3>
                      <p className="text-gray-500">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-blue-500">
                {t('hero.steps.title')}
              </h2>
              <p className="text-gray-500 md:text-xl">
                {t('hero.steps.subtitle')}
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
              {[
                { step: "1", title: t('hero.steps.step1'), desc: t('hero.steps.step1Desc') },
                { step: "2", title: t('hero.steps.step2'), desc: t('hero.steps.step2Desc') },
                { step: "3", title: t('hero.steps.step3'), desc: t('hero.steps.step3Desc') }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center max-w-xs">
                  <div className="w-12 h-12 rounded-lg shadow-md bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                  <p className="text-gray-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-blue-500">
                {t('hero.reviews.title')}
              </h2>
              <p className="text-gray-500 mt-2">
                {t('hero.reviews.subtitle')}
              </p>
            </div>
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {Array.from({ length: 6 }).map((_, i) => (
                  <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <Card className="bg-gray-100">
                        <CardContent className="p-6">
                          <div className="flex flex-col space-y-2">
                            <div className="flex text-yellow-400">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} className="h-5 w-5 fill-current" />
                              ))}
                            </div>
                            <p className="text-gray-600">
                              &quot;{t('hero.reviews.review1')}&quot;
                            </p>
                            <div className="flex items-center space-x-2 mt-4">
                              <div className="h-10 w-10 rounded-full bg-blue-500" />
                              <div>
                                <p className="font-medium">
                                  {t('hero.reviews.user1')}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {t('hero.reviews.user1Role')}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-500 text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
              {t('hero.startButton')}
            </h2>
            <p className="max-w-[600px] mx-auto mb-8">
              {t('hero.startButtonDesc')}
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-500 hover:bg-blue-50 transition-all hover:scale-105"
            >
              {t('hero.startButton')}
              <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <footer className="bg-blue-900 text-gray-300 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2">
                <Zap className="h-6 w-6" />
                <span className="font-bold text-white">AipageGen</span>
              </Link>
              <p className="mt-2 text-sm">© 2025 AipageGen. All rights reserved.</p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-4">快速链接</h3>
              <ul className="space-y-2">
                {["首页", "功能介绍", "价格", "常见问题", "联系我们"].map((item) => (
                  <li key={item}>
                    <Link href={`#${item}`} className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-4">联系我们</h3>
              <ul className="space-y-2">
                <li>邮箱：contact@aipagegen.com</li>
                <li>电话：400-123-4567</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <Button
        className="fixed bottom-5 right-5 bg-blue-500 text-white shadow-lg rounded-full hover:bg-blue-600 transition-all hover:scale-105"
        size="lg"
      >
        {t('hero.startButton')}
        <Download className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

