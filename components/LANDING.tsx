"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useInView, useTransform } from "framer-motion";

// Import shadcn components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Import lucide icons
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Heart,
  Users,
  BookOpen,
  Mic,
  Music,
  Cross,
  Menu,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  CalendarDays,
  X,
  Check,
} from "lucide-react";

// Types
type MassScheduleItem = {
  day: string;
  times: string[];
};

type EventItem = {
  title: string;
  date: string;
  time: string;
  description: string;
  category?: string;
};

type MinistryItem = {
  name: string;
  icon: React.ReactNode;
  description: string;
};

type AnnouncementItem = {
  title: string;
  content: string;
  date?: string;
};

type TestimonialItem = {
  name: string;
  role: string;
  content: string;
  avatar: string;
};

// Data
const MassSchedule: MassScheduleItem[] = [
  { day: "Sunday", times: ["6:00 AM", "8:00 AM", "10:00 AM", "5:00 PM"] },
  { day: "Monday", times: ["6:30 AM"] },
  { day: "Tuesday", times: ["6:30 AM"] },
  { day: "Wednesday", times: ["6:30 AM"] },
  { day: "Thursday", times: ["6:30 AM"] },
  { day: "Friday", times: ["6:30 AM"] },
  { day: "Saturday", times: ["6:30 AM", "5:00 PM (Anticipated Sunday Mass)"] },
];

const UpcomingEvents: EventItem[] = [
  {
    title: "Feast of Madonna del Divino Amore",
    date: "April 12, 2025",
    time: "9:00 AM",
    description:
      "Annual celebration of our parish patron saint with solemn Holy Mass followed by procession and community gathering.",
    category: "Feast Day",
  },
  {
    title: "Holy Week Recollection",
    date: "April 7-9, 2025",
    time: "7:00 PM",
    description:
      "Three-day spiritual recollection in preparation for Holy Week.",
    category: "Spiritual",
  },
  {
    title: "Youth Ministry Training",
    date: "April 18, 2025",
    time: "1:00 PM - 5:00 PM",
    description: "Formation program for youth leaders and volunteers.",
    category: "Formation",
  },
  {
    title: "Parish Community Outreach",
    date: "April 25, 2025",
    time: "8:00 AM",
    description:
      "Quarterly feeding program and medical mission for our local community.",
    category: "Outreach",
  },
];

const Ministries: MinistryItem[] = [
  {
    name: "Liturgical Ministry",
    icon: <BookOpen size={24} />,
    description:
      "Coordinates all liturgical celebrations in the parish to ensure reverent and meaningful worship.",
  },
  {
    name: "Music Ministry",
    icon: <Music size={24} />,
    description:
      "Enhances the liturgy through musical accompaniment and leads the congregation in sacred song.",
  },
  {
    name: "Lectors & Commentators",
    icon: <Mic size={24} />,
    description:
      "Proclaims the Word of God during Mass and guides the congregation through the liturgy.",
  },
  {
    name: "Altar Servers",
    icon: <Cross size={24} />,
    description:
      "Assists the priest during liturgical celebrations and helps ensure the smooth flow of the Mass.",
  },
  {
    name: "Family & Life Ministry",
    icon: <Heart size={24} />,
    description:
      "Supports families through various programs promoting Christian values and family life.",
  },
  {
    name: "Youth Ministry",
    icon: <Users size={24} />,
    description:
      "Provides formation, fellowship, and spiritual growth opportunities for young parishioners.",
  },
  {
    name: "Prayer Groups",
    icon: <Heart size={24} />,
    description:
      "Organizes prayer meetings and devotions to foster deeper spiritual life in the community.",
  },
];

const Announcements: AnnouncementItem[] = [
  {
    title: "Online Donation System Now Available",
    content:
      "Support our parish mission by donating through our secure online platform.",
    date: "March 28, 2025",
  },
  {
    title: "Volunteers Needed for Easter Celebrations",
    content: "Join our team to prepare for the upcoming Easter celebrations.",
    date: "March 30, 2025",
  },
  {
    title: "Bible Study Groups Forming",
    content:
      "New Bible study groups are forming for different age groups and schedules.",
    date: "April 2, 2025",
  },
];

const Testimonials: TestimonialItem[] = [
  {
    name: "Maria Santos",
    role: "Parishioner for 15 years",
    content:
      "This parish has been my spiritual home for over a decade. The community is welcoming and the priests truly care about each member's spiritual journey.",
    avatar: "/api/placeholder/40/40",
  },
  {
    name: "Gabriel Reyes",
    role: "Youth Ministry Leader",
    content:
      "Being part of the youth ministry has strengthened my faith and given me a deeper sense of purpose. I'm grateful for the guidance and support from our parish.",
    avatar: "/api/placeholder/40/40",
  },
  {
    name: "Elena Cruz",
    role: "Choir Member",
    content:
      "Singing in the choir brings me closer to God. Our parish music ministry is like a family, and we're blessed to serve the community through sacred music.",
    avatar: "/api/placeholder/40/40",
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function LANDING() {
  const [activeTab, setActiveTab] = useState("schedule");
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Header/Navigation */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-sm bg-white/70 border-b border-slate-200">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/madonnalogo.png"
              alt="Madonna del Divino Amore Parish"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-semibold text-foreground hidden sm:inline-block">
              Madonna del Divino Amore
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="#mass-schedule"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Mass Schedule
            </Link>
            <Link
              href="#events"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Events
            </Link>
            <Link
              href="#ministries"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Ministries
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <Button variant="default" size="sm" className="ml-4">
              Donate
            </Button>
          </nav>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Madonna del Divino Amore</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 pt-8">
                <Link
                  href="#about"
                  className="flex items-center py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
                <Link
                  href="#mass-schedule"
                  className="flex items-center py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mass Schedule
                </Link>
                <Link
                  href="#events"
                  className="flex items-center py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Events
                </Link>
                <Link
                  href="#ministries"
                  className="flex items-center py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Ministries
                </Link>
                <Link
                  href="#contact"
                  className="flex items-center py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
                <Button className="mt-2">Donate</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-white opacity-50" />
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-red-100 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />

          <div className="container flex flex-col items-center justify-center py-24 md:py-32 text-center relative z-10">
            <motion.div
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              variants={fadeInUp}
              className="space-y-4"
            >
              <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 hover:bg-blue-100">
                Roman Catholic Diocese of Parañaque
              </Badge>
              <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
                Madonna del Divino Amore Parish
              </h1>
              <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
                A welcoming Catholic community fostering faith, hope, and
                charity in Las Piñas City
              </p>

              <div className="flex items-center justify-center">
                <MapPin size={18} className="text-muted-foreground mr-2" />
                <span className="text-muted-foreground">
                  Ayala Southvale Drive, Las Piñas City
                </span>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="w-full sm:w-auto">
                  Mass Schedule <ChevronDown size={16} className="ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Get Involved <Users size={16} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden"
              >
                <Image
                  src="/api/placeholder/600/450"
                  alt="Madonna del Divino Amore Parish"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="space-y-6"
              >
                <Badge variant="outline" className="px-3 py-1">
                  Our Community
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Welcome to Our Parish Family
                </h2>
                <Separator className="bg-primary/20" />
                <p className="text-muted-foreground leading-relaxed">
                  Madonna del Divino Amore Parish serves as a beacon of faith
                  and community in Las Piñas City. We are dedicated to fostering
                  a loving Catholic community that embraces the teachings of
                  Christ, supports spiritual growth, and provides service to
                  those in need.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our parish strives to be a place where all can encounter the
                  Divine Love of God through prayer, sacraments, fellowship, and
                  service to our neighbors.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button>
                    Learn More <ArrowRight size={16} className="ml-2" />
                  </Button>
                  <Button variant="outline">Parish History</Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mass Schedule & Sacraments Section */}
        <section id="mass-schedule" className="py-24 bg-slate-50">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="mb-2">
                Worship With Us
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
                Mass Schedule & Sacraments
              </h2>
              <p className="text-muted-foreground">
                Join us in celebrating the Holy Eucharist and other sacraments
                in our community.
              </p>
            </div>

            <Tabs
              defaultValue="schedule"
              className="max-w-4xl mx-auto"
              onValueChange={setActiveTab}
              value={activeTab}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="schedule">Mass Schedule</TabsTrigger>
                <TabsTrigger value="sacraments">Sacraments</TabsTrigger>
              </TabsList>
              <TabsContent value="schedule" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2" size={20} />
                      Weekly Mass Schedule
                    </CardTitle>
                    <CardDescription>
                      Holy Mass is celebrated daily with additional Masses on
                      Sundays
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={staggerChildren}
                      className="space-y-4"
                    >
                      {MassSchedule.map((schedule) => (
                        <motion.div
                          key={schedule.day}
                          variants={fadeInUp}
                          className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <div className="font-medium">{schedule.day}</div>
                          <div className="md:col-span-2 space-y-1">
                            {schedule.times.map((time, i) => (
                              <div
                                key={i}
                                className="flex items-center text-sm"
                              >
                                <Clock
                                  size={14}
                                  className="mr-2 text-muted-foreground"
                                />
                                <span>{time}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                  <CardFooter className="flex-col items-start">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Heart size={14} className="mr-2" />
                      <span>
                        Confession is available 30 minutes before each Mass or
                        by appointment.
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      Download Full Schedule{" "}
                      <ExternalLink size={14} className="ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="sacraments" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Cross className="mr-2" size={20} />
                      Sacraments
                    </CardTitle>
                    <CardDescription>
                      Information about receiving sacraments at our parish
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-medium">Baptism</h3>
                        <p className="text-sm text-muted-foreground">
                          Baptisms are celebrated every Saturday at 10:00 AM.
                          Parents must attend a preparation class. Please
                          contact the parish office at least one month before
                          your desired date.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Confirmation</h3>
                        <p className="text-sm text-muted-foreground">
                          Confirmation preparation classes begin in September.
                          The sacrament is typically celebrated in May. Contact
                          our Religious Education office for details.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Holy Matrimony</h3>
                        <p className="text-sm text-muted-foreground">
                          Couples planning to marry should contact the parish
                          office at least six months prior to their intended
                          wedding date to begin the marriage preparation
                          process.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Reconciliation</h3>
                        <p className="text-sm text-muted-foreground">
                          Confessions are heard 30 minutes before each Mass,
                          Saturdays from 3:30-4:30 PM, or by appointment with
                          one of our priests.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">
                      Contact for Sacraments{" "}
                      <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-24 bg-white">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="mb-2">
                Parish Life
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
                Upcoming Events
              </h2>
              <p className="text-muted-foreground">
                Join us for these special celebrations and activities in our
                parish community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {UpcomingEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden group">
                    <CardHeader className="bg-slate-50 group-hover:bg-slate-100 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        {event.category && (
                          <Badge variant="secondary" className="text-xs">
                            {event.category}
                          </Badge>
                        )}
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarDays size={14} className="mr-1" />
                          {event.date}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock size={14} className="mr-1" />
                        {event.time}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between"
                      >
                        Event Details
                        <ChevronRight size={16} />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline">
                View All Events <Calendar size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Ministries Section */}
        <section
          id="ministries"
          className="py-24 bg-slate-50 overflow-hidden relative"
        >
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-100 blur-3xl -z-10" />
          <div className="container relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="mb-2">
                Get Involved
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
                Parish Ministries
              </h2>
              <p className="text-muted-foreground">
                Discover your gifts and share them with our community through
                our various ministries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Ministries.map((ministry, index) => (
                <motion.div
                  key={ministry.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center gap-3 pb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <div className="text-primary">{ministry.icon}</div>
                      </div>
                      <CardTitle className="text-lg">{ministry.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {ministry.description}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between"
                      >
                        Learn More
                        <ChevronRight size={16} />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 bg-primary/5 rounded-2xl p-8 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Join a Ministry</h3>
              <p className="text-muted-foreground mb-6">
                We encourage all parishioners to discover their unique gifts and
                use them in service to our community and in building the Kingdom
                of God.
              </p>
              <Button size="lg">
                Contact Ministry Coordinator{" "}
                <Users size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="mb-2">
                Our Community
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
                Parishioner Testimonials
              </h2>
              <p className="text-muted-foreground">
                Hear from members of our parish family about their experiences
                at Madonna del Divino Amore.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {Testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className="mb-4 text-primary">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <span key={i} className="text-yellow-500">
                              ★
                            </span>
                          ))}
                      </div>
                      <p className="text-muted-foreground italic mb-6">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Announcements Section */}
        <section className="py-24 bg-slate-50">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="mb-2">
                Parish News
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
                Latest Announcements
              </h2>
              <p className="text-muted-foreground">
                Stay updated with important news and information from our
                parish.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card>
                <ScrollArea className="h-[400px] pr-4">
                  <CardContent className="pt-6">
                    {Announcements.map((announcement, index) => (
                      // Continue from where it was cut off
                      <React.Fragment key={announcement.title}>
                        <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={fadeInUp}
                          className="mb-6 pb-6 border-b last:border-b-0 last:mb-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">
                              {announcement.title}
                            </h3>
                            {announcement.date && (
                              <Badge variant="outline" className="text-xs">
                                {announcement.date}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {announcement.content}
                          </p>
                        </motion.div>
                      </React.Fragment>
                    ))}
                  </CardContent>
                </ScrollArea>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Announcements
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                <Badge variant="outline" className="mb-2">
                  Get In Touch
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-6">
                  Contact Our Parish
                </h2>
                <p className="text-muted-foreground max-w-md mb-8">
                  We'd love to hear from you. Whether you have questions about
                  our services, want to join our community, or need spiritual
                  guidance, please reach out.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mt-1 mr-4">
                      <MapPin size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        Madonna del Divino Amore Parish
                        <br />
                        Ayala Southvale Drive
                        <br />
                        Las Piñas City, Metro Manila
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mt-1 mr-4">
                      <Phone size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground">
                        Parish Office: (02) 8123-4567
                        <br />
                        Emergency: (02) 8765-4321
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mt-1 mr-4">
                      <Mail size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">
                        Parish Office: office@madonnadeldivinoamore.org
                        <br />
                        Pastor: pastor@madonnadeldivinoamore.org
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mt-1 mr-4">
                      <Clock size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Office Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 8:00 AM - 5:00 PM
                        <br />
                        Saturday: 8:00 AM - 12:00 PM
                        <br />
                        Sunday: Closed (except for Masses)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium mb-3">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon">
                      <Facebook size={18} />
                      <span className="sr-only">Facebook</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Instagram size={18} />
                      <span className="sr-only">Instagram</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Youtube size={18} />
                      <span className="sr-only">YouTube</span>
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="bg-slate-50 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Name
                      </label>
                      <Input id="name" placeholder="Your full name" />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Subject
                    </label>
                    <Input id="subject" placeholder="Message subject" />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      className="min-h-32"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">
                      Send Message <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200 py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/madonnalogo.png"
                  alt="Madonna del Divino Amore Parish"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-semibold text-white">
                  Madonna del Divino Amore
                </span>
              </div>
              <p className="text-slate-400 mb-6">
                A welcoming Catholic community fostering faith, hope, and
                charity in Las Piñas City.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Youtube size={20} />
                  <span className="sr-only">YouTube</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#about"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#mass-schedule"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Mass Schedule
                  </a>
                </li>
                <li>
                  <a
                    href="#events"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="#ministries"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Ministries
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Bulletin
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Donate
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Sacraments</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Baptism
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Confirmation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Holy Eucharist
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Reconciliation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Matrimony
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Anointing of the Sick
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Subscribe</h3>
              <p className="text-slate-400 mb-4">
                Stay updated with our parish news and events by subscribing to
                our newsletter.
              </p>
              <form className="space-y-3">
                <Input
                  placeholder="Your email address"
                  className="bg-slate-800 border-slate-700 text-white"
                />
                <Button className="w-full">Subscribe</Button>
              </form>
            </div>
          </div>

          <Separator className="my-12 bg-slate-800" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Madonna del Divino Amore Parish. All
              rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Site Credits
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
