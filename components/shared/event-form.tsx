'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { eventFormSchema } from '@/lib/validation/form-event-validation';
import { eventDefaultValues } from '@/lib/contants';
import DropdownCategories from '@/components/shared/dropdown-categories';
import { Textarea } from '@/components/ui/textarea';
import FileUploader from '@/components/shared/file-uploader';
import { useState } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import { Checkbox } from '@/components/ui/checkbox';
import { useUploadThing } from '@/lib/uploadthing';
import { handleError } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { createEvent } from '@/lib/actions/event-actions';
import { EventFormDataType } from '@/types/event-types';
import 'react-datepicker/dist/react-datepicker.css';

type EventFormProps = {
  userId: string;
  type: 'Create' | 'Update';
};

const EventForm = ({ userId, type }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing('imageUploader');
  const router = useRouter();

  const form = useForm<EventFormDataType>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: eventDefaultValues,
  });

  const onSubmit: SubmitHandler<EventFormDataType> = async (data) => {
    console.log(data);

    let uploadImageUrl = data.imageUrl;
    if (files.length) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) return;

      uploadImageUrl = uploadedImages[0].url;
    }

    if (type === 'Create') {
      try {
        const event = await createEvent({
          event: { ...data, imageUrl: uploadImageUrl },
          userId,
          path: '/profile',
        });

        if (event) {
          form.reset();
          router.push(`/events/${event.id}`);
        }
      } catch (e) {
        handleError(e);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Event tiitle" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <DropdownCategories value={field.value} onChangeHandler={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-xl resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="h-[54px] w-full px-4 py-2 flex-center rounded-full overflow-hidden bg-grey-50">
                    <Image
                      src="/assets/icons/location-grey.svg"
                      alt="location"
                      width={24}
                      height={24}
                    />
                    <Input placeholder="Event location" {...field} className="input-field" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="h-[54px] w-full px-4 py-2 flex-center rounded-full overflow-hidden bg-grey-50">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 text-gray-600 whitespace-nowrap">Start Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="h-[54px] w-full px-4 py-2 flex-center rounded-full overflow-hidden bg-grey-50">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 text-gray-600 whitespace-nowrap">End Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="h-[54px] w-full px-4 py-2 flex-center rounded-full overflow-hidden bg-grey-50">
                    <Image
                      src="/assets/icons/dollar.svg"
                      alt="price"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="p-regular-16 border-0 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />

                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label
                                htmlFor="isFree"
                                className="pr-3 whitespace-nowrap leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Free Ticket
                              </label>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                id="isFree"
                                className="h-5 w-5 border-2 border-primary-500"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="h-[54px] w-full px-4 py-2 flex-center rounded-full overflow-hidden bg-grey-50">
                    <Image
                      src="/assets/icons/link.svg"
                      alt="link"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <Input
                      placeholder="URL"
                      {...field}
                      className="p-regular-16 border-0 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="w-full button col-span-2"
        >
          {form.formState.isSubmitting ? 'Submitting...' : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
