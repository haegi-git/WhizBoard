import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // 중복 방지
      lowercase: true, // 소문자 저장
      trim: true, // 공백 제거
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // 보안상 최소 길이 추천
    },
    nickName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // ✅ createdAt, updatedAt 자동 생성
  }
);

// 이미 모델이 등록되어 있으면 재사용 (Next.js hot reload 대응)
const User = models.User || model("User", UserSchema);

export { User };
