from django import forms

class PhoneForm(forms.Form):
    phone = forms.CharField(max_length=11)
    cod = forms.CharField(max_length=6)


class CheckForm(forms.Form):
    cod = forms.CharField(max_length=6)
