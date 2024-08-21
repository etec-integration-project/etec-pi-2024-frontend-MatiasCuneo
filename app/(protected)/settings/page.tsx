"use client";

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settings } from '@/actions/settings';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent
} from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { useTransition, useState } from 'react';
import { SettingsSchema } from '@/schemas';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { FormSuccess } from '@/components/form-success';
import { FormError } from '@/components/form-error';
import { Switch } from '@/components/ui/switch';

const SettingsPage = () => {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      new_password: undefined,
      isTFAEnabled: user?.isTFAEnabled || false
    }
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setSuccess("");
    setError("");

    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) setError(data.error);
          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Algo salio mal"));
    });
  };

  return (
    <Card className='w-[600px]'>
      <CardHeader className='text-2xl font-semibold text-center'>
        Ajustes
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Tu nombre..."
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              {user?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Tu email..."
                            disabled={isPending}
                            type='email'
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Tu contraseña..."
                            disabled={isPending}
                            type='password'
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="new_password"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Nueva Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="******"
                            disabled={isPending}
                            type='password'
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isTFAEnabled"
                    render={({field}) => (
                      <FormItem className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>
                        <div className='space-y-0.5'>
                          <FormLabel>Autenticacion de Dos Pasos</FormLabel>
                          <FormDescription>Activar la autenticacion de dos pasos para tu cuenta</FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            disabled={isPending}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button
              type='submit'
              disabled={isPending}
            >
              Guardar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;