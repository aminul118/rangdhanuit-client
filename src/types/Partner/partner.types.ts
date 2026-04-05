export interface IPartner {
  _id: string;
  name: string;
  slug: string;
  logo: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
}

export type PartnerPayload = Partial<IPartner>;
