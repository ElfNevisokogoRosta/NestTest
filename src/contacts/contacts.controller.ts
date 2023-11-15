import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { IContact } from 'src/interfaces/interface';
import { ContactsService } from './contacts.service';
import { CreateContactDto, UpdateContactDto } from 'src/utils/';

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  async contactList(): Promise<IContact[]> {
    return await this.contactsService.getContacts();
  }
  @Get(':id')
  async findContactById(@Param('id') contactId: string): Promise<IContact> {
    try {
      return await this.contactsService.findOne(contactId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Post()
  async createContact(
    @Body() createContactDto: CreateContactDto,
  ): Promise<IContact> {
    return await this.contactsService.createContact(createContactDto);
  }
  @Delete(':id')
  async deleteContact(@Param('id') contactID: string): Promise<void> {
    try {
      await this.contactsService.deleteContact(contactID);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Put(':id')
  async updateContact(
    @Param('id') contactId: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    try {
      await this.contactsService.updateContact(contactId, updateContactDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
