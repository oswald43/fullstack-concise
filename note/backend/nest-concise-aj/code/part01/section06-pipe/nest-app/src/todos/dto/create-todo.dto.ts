import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MaxLength(100)
  content: string;

  @IsBoolean()
  isCompleted: boolean;
}
