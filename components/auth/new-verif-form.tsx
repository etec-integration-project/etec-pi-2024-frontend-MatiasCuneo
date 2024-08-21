"use client";

import { BarLoader } from 'react-spinners';
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '@/actions/new-verification';

import { FormSuccess } from '@/components/form-success';
import { FormError } from '@/components/form-error';

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const handleSubmit = useCallback(() => {
    if (!token) {
      setError("El token no existe")
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Algo salio mal");
      })
  }, [token]);

  useEffect(() => {
    handleSubmit()
  }, [handleSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirmando tu verificacion"
      backButtonLabel="Vuelve a Ingresar"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && (
          <BarLoader/>
        )}
        <FormError message={error}/>
        <FormSuccess message={success}/>
      </div>
    </CardWrapper>
  );
};