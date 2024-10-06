import { t } from "elysia";

export const onboardingDto = {
  body: t.Object({
    key: t.String(),
    question: t.String(),
    answer: t.String()
  }),
}
