"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addQuestion, updateQuestion } from "@/app/admin/questions/actions";

interface QuestionFormProps {
  question?: {
    id: number;
    text: string;
    sequence: number;
    questionType: "SINGLE_SELECT" | "MULTIPLE_SELECT" | "TEXT";
    required: boolean;
    isActive: boolean;
    options: {
      id: number;
      text: string;
      sequence: number;
    }[];
  };
}

export default function QuestionForm({ question }: QuestionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [options, setOptions] = useState(question?.options || []);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const questionData = {
      text: formData.get("text") as string,
      sequence: parseInt(formData.get("sequence") as string),
      questionType: formData.get("questionType") as
        | "SINGLE_SELECT"
        | "MULTIPLE_SELECT"
        | "TEXT",
      required: formData.get("required") === "on",
      isActive: formData.get("isActive") === "on",
      options: options.map((option, index) => ({
        text: option.text,
        sequence: index + 1,
      })),
    };

    try {
      if (question) {
        await updateQuestion(question.id, questionData);
      } else {
        await addQuestion(questionData);
      }
      router.push("/admin/questions");
      router.refresh();
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Failed to submit question. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addOption = () => {
    setOptions([
      ...options,
      { id: Date.now(), text: "", sequence: options.length + 1 },
    ]);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const updateOption = (index: number, text: string) => {
    const newOptions = [...options];
    newOptions[index].text = text;
    setOptions(newOptions);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="text">Question Text</Label>
        <Textarea
          id="text"
          name="text"
          defaultValue={question?.text}
          required
        />
      </div>
      <div>
        <Label htmlFor="sequence">Sequence</Label>
        <Input
          id="sequence"
          name="sequence"
          type="number"
          defaultValue={question?.sequence || 1}
          required
        />
      </div>
      <div>
        <Label htmlFor="questionType">Question Type</Label>
        <Select
          name="questionType"
          defaultValue={question?.questionType || "SINGLE_SELECT"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select question type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SINGLE_SELECT">Single Select</SelectItem>
            <SelectItem value="MULTIPLE_SELECT">Multiple Select</SelectItem>
            <SelectItem value="TEXT">Text</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="required"
          name="required"
          defaultChecked={question?.required}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <Label htmlFor="required">Required</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          defaultChecked={question?.isActive}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <Label htmlFor="isActive">Active</Label>
      </div>
      <div>
        <Label>Options</Label>
        {options.map((option, index) => (
          <div key={option.id} className="flex items-center space-x-2 mt-2">
            <Input
              value={option.text}
              onChange={(e) => updateOption(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
            <Button
              type="button"
              onClick={() => removeOption(index)}
              variant="destructive"
              size="sm"
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addOption} className="mt-2">
          Add Option
        </Button>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? "Submitting..."
          : question
            ? "Update Question"
            : "Add Question"}
      </Button>
    </form>
  );
}
