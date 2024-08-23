declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.webp";

interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}