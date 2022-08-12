using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Text.RegularExpressions;

namespace Common.Library
{
    public static class BaseHelper
    {
        public static string RandomShortID()
        {
            long ticks = (long)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, 0))).TotalMilliseconds;//EPOCH
            char[] baseChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".ToCharArray();

            int i = 32;
            char[] buffer = new char[i];
            int targetBase = baseChars.Length;

            do
            {
                buffer[--i] = baseChars[ticks % targetBase];
                ticks /= targetBase;
            }
            while (ticks > 0);

            char[] result = new char[32 - i];
            Array.Copy(buffer, i, result, 0, 32 - i);

            return new string(result);
        }

        public static bool SaveImage(string imageStream, string imagePath)
        {
            try
            {
                byte[] data = CleanImageStream(imageStream);
                using (MemoryStream ms = new MemoryStream(data))
                {
                    Image img = Image.FromStream(ms);
                    img.Save(imagePath);
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public static bool ValidateImage(string imageStream)
        {
            try
            {
                byte[] data = CleanImageStream(imageStream);
                using (Stream stream = new MemoryStream(data))
                {
                    using (Image img = Image.FromStream(stream))
                    {
                        if (img.RawFormat.Equals(ImageFormat.Jpeg) || img.RawFormat.Equals(ImageFormat.Png))
                            return true;
                    }
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public static byte[] CleanImageStream(string imageStream)
        {
            Regex regex = new Regex(@"^[\w/\:.-]+;base64,");
            string cleanStream = regex.Replace(imageStream, string.Empty);
            return Convert.FromBase64String(cleanStream);
        }
    }
}