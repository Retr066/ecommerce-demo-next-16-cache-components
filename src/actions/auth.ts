'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { loginSchema, registerSchema } from '@/validations/auth';
import { prisma } from '@/lib/prisma';

export async function login(prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Datos inválidos' };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function register(prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient();

  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  };

  const validatedFields = registerSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Datos inválidos' };
  }

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
      },
    },
  });

  console.log("error",error)

  if (error) {
    // Mensajes de error más claros
    if (error.message.includes('rate_limit')) {
      return { error: 'Demasiados intentos. Espera unos minutos antes de intentar de nuevo.' };
    }
    if (error.message.includes('Email')) {
      return { error: 'Este email ya está registrado o es inválido.' };
    }
    if (error.message.includes('Invalid API key')) {
      return { error: 'Error de configuración. Verifica tus credenciales de Supabase.' };
    }
    return { error: error.message };
  }

  // Crear usuario en la base de datos local
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: {
          id: user.id,
          email: user.email!,
          name: data.name,
        },
      });
    }
  } catch (dbError) {
    console.error('Error creating user in database:', dbError);
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
