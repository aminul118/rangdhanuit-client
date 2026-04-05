export interface IPartner {
  _id: string;
  name: string;
  slug: string;
  logo: string;
  link?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PartnerPayload = Partial<IPartner>;
