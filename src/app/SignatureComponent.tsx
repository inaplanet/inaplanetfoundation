'use client';

type SignatureComponentProps = {
  text: string;
};

export default function SignatureComponent({ text }: SignatureComponentProps) {
  return (
    <div className="landing-showcase__signature">
      <p className="landing-showcase__footer-note">{text}</p>
    </div>
  );
}
