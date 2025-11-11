import React from "react";

interface ServicesCardProps {
  index?: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ComponentType<any>;
  title: string;
  description: string;
}

const ServicesCard: React.FC<ServicesCardProps> = ({ index = 1, icon: Icon, title, description }) => {
  return (
    <div className="services-card group">
      <div className="services-card-bg" aria-hidden />

      <div className="services-card-number" aria-hidden>
        <p className="services-card-number-text">{String(index).padStart(2, "0")}</p>
      </div>

      <div className="services-card-body">
        <div className="services-card-icon">
          <Icon className="services-card-icon-svg" />
        </div>

        <h3 className="services-card-title">{title}</h3>
        <p className="services-card-desc">{description}</p>
      </div>
    </div>
  );
};

export default ServicesCard;
