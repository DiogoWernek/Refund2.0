import FoodSvg from "../assets/food.svg";
import OthersSvg from "../assets/others.svg";
import ServicesSvg from "../assets/services.svg";
import TransportSvg from "../assets/transport.svg";
import AccomodationSvg from "../assets/accommodation.svg";

export const CATEGORIES = {
  food: {
    name: "Alimentação",
    icon: FoodSvg,
  },
  others: {
    name: "Outros",
    icon: OthersSvg,
  },
  services: {
    name: "Serviços",
    icon: ServicesSvg,
  },
  transport: {
    name: "Transporte",
    icon: TransportSvg,
  },
  accomodation: {
    name: "Hospedagem",
    icon: AccomodationSvg,
  },
}

export const CATEGORIES_KEYS = Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>;