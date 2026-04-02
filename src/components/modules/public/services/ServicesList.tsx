"use client";

import { motion } from "framer-motion";
import ServiceCard from "@/components/modules/public/services/ServiceCard";
import { IService } from "@/types/Service/service.types";
import { Container } from "@/components/ui/Container";
import { STAGGER_CHILDREN, VIEWPORT_CONFIG } from "@/constants/animations";

interface ServicesListProps {
  services: IService[];
}

export function ServicesList({ services }: ServicesListProps) {
  return (
    <Container>
      <motion.div
        variants={STAGGER_CHILDREN}
        initial="initial"
        whileInView="whileInView"
        viewport={VIEWPORT_CONFIG}
        className="grid gap-6 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service: IService, index: number) => (
          <ServiceCard key={service._id} service={service} index={index} />
        ))}
      </motion.div>
    </Container>
  );
}
