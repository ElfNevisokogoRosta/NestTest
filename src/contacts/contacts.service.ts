import { Injectable, NotFoundException } from '@nestjs/common';
import { IContact } from '../interfaces/interface';
import { nanoid } from 'nanoid';

@Injectable()
export class ContactsService {
  private readonly contacts: IContact[] = [];

  findOne(id: string): IContact {
    const index = this.contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    const contact = this.contacts[index];
    return contact;
  }
  getContacts(): IContact[] {
    return this.contacts;
  }
  createContact(contactInfo): IContact {
    const newContact = { ...contactInfo, id: nanoid() };
    this.contacts.push(newContact);
    return newContact;
  }
  deleteContact(id: string): void {
    const index = this.contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    this.contacts.splice(index, 1);
  }
  updateContact(id: string, contact: IContact) {
    const index = this.contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    const { email, name, phone, favorite } = this.contacts[index];
    this.deleteContact(id);
    const updatedContact = {
      id,
      email: contact.email || email,
      name: contact.name || name,
      phone: contact.phone || phone,
      favorite: contact.favorite || favorite,
    };
    this.contacts.push(updatedContact);
    return updatedContact;
  }
}
