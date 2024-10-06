import { t } from "elysia";

export const answerDto = {
  body: t.Object({
    question: t.String(),
    answer: t.String()
  }),
}
