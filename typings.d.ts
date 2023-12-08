import { User } from "@prisma/client"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /*interface Session {
    user: User
  }*/
  type CustomSession = Omit<User, "id"> & { id: string }

  interface Session {
    user: CustomSession
  }
}

declare module "next-auth/jwt" {
  type CustomJWT = Omit<User, "id"> & { id: string }
  type JWT = CustomJWT
  //type JWT = User
}
